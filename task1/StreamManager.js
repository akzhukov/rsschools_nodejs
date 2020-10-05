const fs = require('fs');
const { Transform } = require('stream');
const caesar = require('./CaesarCipher')

async function inputStream(filePath) {
    if (filePath === 'stdin') {
        return process.stdin;
    }
    try {
        await fs.promises.access(filePath);
    } catch (error) {
        let message = '';
        if (error.code === 'ENOENT') {
            message += `File ${filePath} is missing.`;
        } else {
            message += `File ${filePath} can't be accessed.`;
        }
        throw {
            name: 'Input File Error',
            message,
            exitCode: 2
        };
    }
    try {
        return fs.createReadStream(filePath);
    }
    catch (error) {
        throw {
            name: 'InputStream Error',
            message: `File ${filePath} can't be processed properly.`,
            exitCode: 2
        };
    }
}

async function outputStream(filePath) {
    if (filePath === 'stdout') {
        return process.stdout;
    }
    try {
        await fs.promises.access(filePath);
    } catch (error) {
        let message = '';
        if (error.code === 'ENOENT') {
            message += `File ${filePath} is missing.`;
        } else {
            message += `File ${filePath} can't be accessed.`;
        }
        throw {
            name: 'Output File Error',
            message,
            exitCode: 2
        };
    }
    try {
        return fs.createWriteStream(filePath, { flags: 'a+' });
    }
    catch (error) {
        throw {
            name: 'OutputStream Error',
            message: `File ${filePath} can't be processed properly.`,
            exitCode: 2
        };
    }
}

const transformStream = (shift, action) => {
    return new Transform({
        transform(chunk, _, callback) {
            if (action === 'encode')
                this.push(caesar.encode(chunk.toString(), shift));
            else
                this.push(caesar.decode(chunk.toString(), shift));
            callback();
        }
    });
};

module.exports = { inputStream, transformStream, outputStream };

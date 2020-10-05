const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

async function processRun() {
    try {
        const args = require('./CommandLineParser.js');
        const {
            inputStream,
            transformStream,
            outputStream
        } = require('./StreamManager.js');

        await pipeline(
            await inputStream(args.input),
            transformStream(args.shift, args.action),
            await outputStream(args.output)
        );
        process.stdout.write(`Operation '${args.action}' is done.`);
    } catch (error) {
        process.stderr.write(`${error.name}. ${error.message}\n`);
        process.exit(error.exitCode);
    }
}

processRun();
const { program } = require('commander');

program
    .storeOptionsAsProperties(true)
    .option('-s, --shift <>', 'shift', shift => {
        return !isNaN(shift) ? parseInt(shift, 10) : NaN;
    })
    .option('-i, --input <>', 'input file', 'stdin')
    .option('-o, --output <>', 'output file', 'stdout')
    .option('-a, --action <>', 'action encode/decode')
    .parse(process.argv);

if (!checkShiftArg(program.shift)) {
    throw {
        name: 'CommandLineArgs Error',
        message: 'Required argument --shift is missing or wrong.',
        exitCode: 1
    };
}
if (!checkActionArg(program.action)) {
    throw {
        name: 'CommandLineArgs Error',
        message: 'Required argument --action is missing or wrong.',
        exitCode: 1
    };
}

function checkShiftArg(shift) {
    return !Number.isNaN(shift);
}

function checkActionArg(action) {
    return action === 'encode' || action === 'decode';
}

const args = {
    shift: program.shift,
    input: program.input,
    output: program.output,
    action: program.action
};

module.exports = args;

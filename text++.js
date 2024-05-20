class texpp {
    getInfo() {
        return {
            id: 'textplusplus',
            name: 'Text++',
	    color1: '#f5bf3e',
            blocks: [
                {
                    opcode: 'splitString',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'split [TEXT] by [CHAR]',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello "world how" are you?'
                        },
                        CHAR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ' '
                        }
                    }
                },
                {
                    opcode: 'newLine',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'New Line',
                    arguments: {}
                },
                {
                    opcode: 'tab',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Tab',
                    arguments: {}
                },
                {
                    opcode: 'unicodeChar',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Return unicode [UNICODE]',
                    arguments: {
                        UNICODE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1F600'
                        }
                    }
                },
                {
                    opcode: 'unicodeOf',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Unicode of [CHAR]',
                    arguments: {
                        CHAR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '😀'
                        }
                    }
                },
                {
                    opcode: 'toRot13',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'to Rot13 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello world'
                        }
                    }
                },
                {
                    opcode: 'fromRot13',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'from Rot13 [TEXT]',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Uryyb jbeyq'
                        }
                    }
                },
                {
                    opcode: 'allIndexesOfCharacter',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'return all indexes for character [CHARACTER] in [STRING]',
                    arguments: {
                        CHARACTER: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'a'
                        },
                        STRING: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'abracadabra'
                        }
                    }
                },
                {
                    opcode: 'toUpperCase',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT] to uppercase',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello world'
                        }
                    }
                },
                {
                    opcode: 'toLowerCase',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT] to lowercase',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'HELLO WORLD'
                        }
                    }
                },
                {
                    opcode: 'toTitleCase',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT] to title case',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'hello world'
                        }
                    }
                },
                {
                    opcode: 'removeCharByIndex',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'remove character [INDEX] from [TEXT]',
                    arguments: {
                        INDEX: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 1 
                        },
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello world'
                        }
                    }
                }
            ]
        };
    }

    splitString({ TEXT, CHAR }) {
        const result = [];
        let current = '';
        let insideQuotes = false;

        for (let i = 0; i < TEXT.length; i++) {
            const char = TEXT[i];

            if (char === '"') {
                insideQuotes = !insideQuotes;
                current += char;
            } else if (char === CHAR && !insideQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        if (current) {
            result.push(current);
        }

        return JSON.stringify(result);
    }

    newLine() {
        return '\n';
    }

    tab() {
        return '\t';
    }

    unicodeChar({ UNICODE }) {
        try {
            return String.fromCodePoint(parseInt(UNICODE, 16));
        } catch (e) {
            return '';
        }
    }

    unicodeOf({ CHAR }) {
        return CHAR.codePointAt(0).toString(16).toUpperCase();
    }

    toRot13({ TEXT }) {
        return TEXT.replace(/[A-Za-z]/g, function (c) {
            return String.fromCharCode(
                c.charCodeAt(0) + (c.toUpperCase() <= "M" ? 13 : -13)
            );
        });
    }

    fromRot13({ TEXT }) {
        return this.toRot13({ TEXT });
    }

    allIndexesOfCharacter({ CHARACTER, STRING }) {
        const indexes = [];
        for (let i = 0; i < STRING.length; i++) {
            if (STRING[i] === CHARACTER) {
                indexes.push(i + 1);
            }
        }
        return indexes.join(', ');
    }

    toUpperCase({ TEXT }) {
        return TEXT.toUpperCase();
    }

    toLowerCase({ TEXT }) {
        return TEXT.toLowerCase();
    }

    toTitleCase({ TEXT }) {
        return TEXT.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    removeCharByIndex({ INDEX, TEXT }) {
        if (INDEX < 1 || INDEX > TEXT.length) {
            return TEXT;
        }
        return TEXT.slice(0, INDEX - 1) + TEXT.slice(INDEX);
    }
}

Scratch.extensions.register(new texpp());

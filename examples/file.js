const fs = require('fs')
const {LogLevel, Logger} = require('plop-logger')

// Be sure to use the best practice for handling files. This is just an example.
class FileAppender {
    constructor(filename) {
        this.filename = filename
    }

    // Format
    formatLevel(level) {
        return LogLevel[level]
    }

    formatDate(now) {
        return now.toLocaleTimeString()
    }

    formatName(name) {
        return name
    }

    formatMessage(message) {
        return message
    }

    formatArg(arg) {
        return '' + arg
    }

    formatDump(obj) {
        return ['dump', JSON.stringify(obj, null, 2), '\n'].join(' ')
    }

    formatEntry(entry) {
        const formatted = [
            this.formatLevel(entry.level),
            this.formatDate(entry.now),
            this.formatName(entry.name),
            '-',
            this.formatMessage(entry.message),
            '\n'
        ]
        if (typeof entry.arg !== 'undefined') {
            formatted.push(this.formatArg(entry.arg))
        }
        return formatted.join(' ')
    }

    log(entry) {
        const formatted = this.formatEntry(entry)
        // could also append to the file entry.name+'.log'
        fs.appendFile(this.filename, formatted, function (err) {
            if (err) throw err
        })
    }

    dump(obj) {
        const formatted = this.formatDump(obj)
        fs.appendFile(this.filename, formatted, function (err) {
            if (err) throw err
        })
    }

}

Logger.config.appender = new FileAppender('plop.log')

// Get a logger with the `plop` name
const logger = Logger.getLogger('plop')
logger.info('Yo plop !')
logger.dump({city: 'Toulouse'})
logger.error('No more confit')
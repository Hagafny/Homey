const queryService = require('./queryService');
const pg = require('pg');
pg.defaults.ssl = true;

const connectionString = process.env.DATABASE_URL || "postgres://jvtbnwwrwltemx:3b58a1ca37657704321d9b83da14f7c44ff41e33d8bdbc1fd27416c8caf9c97b@ec2-54-247-166-129.eu-west-1.compute.amazonaws.com:5432/d8cg3vb6m5pl2l";
const client = new pg.Client(connectionString);
client.connect();

let getAssingments = (cb) => {
    let rows = [];
    let sql = queryService.getAssingments();

    client.query(sql).on('row', (row) => {
        rows.push(row);
    })
        .on('end', () => {
            if (typeof cb === typeof Function)
                cb(rows);
        })

}


let saveAssignment = (assignment, cb) => {
    let sql = queryService.saveAssignment();

    let values = [
        assignment.homeworkUrl,
        assignment.courseId,
        assignment.ex,
        assignment.endDate,
        assignment.moodleId
    ]

    client.query(sql, values, (err, values) => {
        if (err) throw err;
        if (typeof cb === typeof Function)
            cb();
    });
}

let service = {
    getAssingments: getAssingments,
    saveAssignment: saveAssignment
};

module.exports = service;
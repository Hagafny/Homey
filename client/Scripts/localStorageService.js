import AssignmentState from './../Classes/AssignmentState.js';
const assignmentsStateKey = 'assignmentsState';

initializeAssignmentsState();

function initializeAssignmentsState() {
    let assignmentsState = getAssignmentsState();
    if (!assignmentsState)
        saveAssignmentsState({});
}

let changeDoneState = (assignmentId, doneState, cb) => {
    let assignmentsState = getAssignmentsState();
    assignmentsState[assignmentId].done = doneState;
    saveAssignmentsState(assignmentsState);

    if (typeof cb === typeof Function)
        cb();
}

let changeShowState = (assignmentId, showState, cb) => {
    let assignmentsState = getAssignmentsState();
    assignmentsState[assignmentId].show = showState;
    saveAssignmentsState(assignmentsState);

    if (typeof cb === typeof Function)
        cb();
}

let setupAssignmentsState = (assignments, cb) => {
    removeOldAssignments(assignments);
    createDefaultStateForNewAssignments(assignments);
    if (typeof cb === typeof Function)
        cb();
}

function refreshViewState(assignments) {
    let assignmentsState = getAssignmentsState();
    return assignments.map((assignment) => {
        assignment.viewState = assignmentsState[assignment.id];
        return assignment;
    });
}

function getAssignmentsState() {
    return JSON.parse(localStorage.getItem(assignmentsStateKey));
}

function saveAssignmentsState(assignmentsState) {
    localStorage.setItem(assignmentsStateKey, JSON.stringify(assignmentsState));
}

module.exports = {
    setupAssignmentsState: setupAssignmentsState,
    changeDoneState: changeDoneState,
    changeShowState: changeShowState,
    refreshViewState: refreshViewState

}


function createDefaultStateForNewAssignments(assignments) {
    let assignmentsState = getAssignmentsState();
    let assignmentsLength = assignments.length;

    for (let i = 0; i < assignmentsLength; i++) {
        let assignment = assignments[i];
        let assignmentID = assignment.id;
        if (!assignmentsState[assignmentID]) {
            assignmentsState[assignmentID] = new AssignmentState();
        }
    }

    saveAssignmentsState(assignmentsState);
}

function removeOldAssignments(assignments) {
    let assignmentsState = getAssignmentsState();
    let newAssignments = {};
    for (let id in assignmentsState) {
        if (assignmetsContains(assignments, id)) {
            newAssignments[id] = assignmentsState[id];
        }
    }
    saveAssignmentsState(newAssignments);
}

function assignmetsContains(assignmets, id) {
    let found = false;
    let assignmentsLength = assignmets.length;

    for (let i = 0; i < assignmentsLength; i++) {
        if (assignmets[i].id == id) {
            found = true;
            break;
        }
    }
    return found;
}
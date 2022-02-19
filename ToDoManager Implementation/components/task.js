class Task{    
    constructor(id, description, important, privateTask, deadline, project, completed, active, completers) {
        if(id)
            this.id = id;

        this.description = description;
        
        if(important != undefined)
            this.important = important;
        else
            this.important = false;

        if(privateTask != undefined)
            this.private = privateTask;
        else
            this.private = true;

        if(deadline)
            this.deadline = deadline;
        else
            this.deadline = undefined;
        
        if(project)
            this.project = project;
        else
            this.project = undefined;
          
        this.completed = completed || false;
        this.active = active;

        if(completers != undefined)
            this.completers = completers;
        else
            this.completers = 1;

        var selfLink = "/api/tasks/" + this.id;
        this.self =  selfLink;
    }
}

module.exports = Task;



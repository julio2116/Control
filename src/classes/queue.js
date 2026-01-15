class Queue{
    constructor(){
        this.queue = Promise.resolve();
    }

    enQueue(cbFunction){
        this.queue = this.queue.then(() => cbFunction()).catch(err => console.error(err));
        return this.queue
    }
}

export default new Queue()
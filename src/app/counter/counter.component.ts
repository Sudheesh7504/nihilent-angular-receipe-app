import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

    @Input() like = 0;
    @Input() dislike = 0;
    @Output() likeCounter = new EventEmitter<number>()
    @Output() dislikeCounter = new EventEmitter<number>()


    increment() {
        console.log("count")
        this.like++;
        this.likeCounter.emit(this.like);

    }


    Decrement() {
        console.log("count")
        this.dislike++;
        this.dislikeCounter.emit(this.dislike);
    }




}

import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { Constants } from '../shared/util/constants';
import { TimetableService } from '../shared/timetable.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { StationTimetableCriteria } from '../shared/models/station-timetable-criteria';
import { InterchangeGuideAndTimetable } from '../shared/models/interchange-guide-and-timetable';
import { TimeFormatUtil } from '../shared/util/time-format-util';

@Component({
    selector: 'app-station-timetable-for-interchange',
    templateUrl: './station-timetable-for-interchange.component.html',
    styleUrls: ['./station-timetable-for-interchange.component.scss']
})

export class StationTimetableForInterchangeComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public criteria: StationTimetableCriteria, private timetableService: TimetableService) { }

    timetableSections: InterchangeGuideAndTimetable[] = [];

    ngOnInit() {
        this.timetableService.getStationTimetable(this.criteria).subscribe((result) => {
            this.timetableSections = result;
            this.timetableSections.forEach((item) => {
                item.directionInfo = Constants.LINE.find(x => x.lineId === item.lineId).direction;
            });
            console.log(this.timetableSections);
        });
    }

    getTimeDisplay(time: number) {
        return TimeFormatUtil.getTimeDisplay(time);
    }
}
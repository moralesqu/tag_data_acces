import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlanedCompetition } from 'src/app/competition/providers/planed-competition';

const PLANNED_COMPETITIONS_COLLECTION = 'PlannedCompetitions';
const PLAYERS_NESTED_COLLECTION = 'Players';

@Injectable({
    providedIn: 'root'
})
export class CompetitionService {
    public competitions$: Observable<DocumentChangeAction<PlanedCompetition>[]>;

    constructor(private angularFirestore: AngularFirestore) {
        this.competitionCollectionData();

        // this.competitions$.subscribe((data) => {
        //     const docData = data[0].payload.doc.data();
        //     const docId = data[0].payload.doc.id;
        //     console.log(docData);
        //     angularFirestore.collection(`PlannedCompetitions/${docId}/Players`).valueChanges()
        //         .pipe(take(1)).subscribe((players) => {
        //         console.log(players);
        //     });
        // });
    }

    private competitionCollectionData(): void {
        this.competitions$ = this.angularFirestore.collection<PlanedCompetition>(PLANNED_COMPETITIONS_COLLECTION).snapshotChanges();
    }
}

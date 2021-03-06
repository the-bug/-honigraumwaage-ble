import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SendSupperMappingService } from '../common/send-supper-mapping.service';
import { SchleuderungDataService } from '../common/schleuderung-data.service';
import { Subscription } from 'rxjs';
import { Schleuderung } from '../common/model/schleuderung';
import { UUID } from 'angular2-uuid';
import { SupperMappingForSaveAndSend } from '../common/model/supper-mapping-for-save-and-send';

@Component({
  selector: 'app-supper-mapping',
  templateUrl: './supper-mapping.component.html',
  styleUrls: ['./supper-mapping.component.css']
})
export class SupperMappingComponent implements OnInit, OnDestroy {

  form: FormGroup;
  schleuderungSubscription: Subscription;
  schleuderung: Schleuderung;
  schleuderungAktive = false;

  constructor(
    private fb: FormBuilder,
    private sendSupperMappingService: SendSupperMappingService,
    private harvestDataService: SchleuderungDataService
  ) { }

  ngOnInit() {
    this.buildDefaultForm();
    this.subscripeToSchleuderung();
  }

  ngOnDestroy() {
    this.schleuderungSubscription.unsubscribe();
  }

  private subscripeToSchleuderung() {
    this.schleuderungSubscription = this.harvestDataService.schleuderung$.subscribe(s => {
      this.schleuderung = s;
      if (s.sorte !== '' && s.standort !== '') {
        this.schleuderungAktive = true;
      }
    });
  }

  addSupperMark() {
    this.supperMarks.push(this.fb.control(''));
  }

  get supperMarks() {
    return this.form.get('supperMarks') as FormArray;
  }

  private get hiveMark() {
    return this.form.get('hiveMark') as FormControl;
  }

  onSubmit() {
    const supperMapping: SupperMappingForSaveAndSend = {
      id: UUID.UUID(),
      hiveMark: this.hiveMark.value,
      supperMarks: this.supperMarks.value.filter((i: any) => i !== ''),
      schleuderung: this.schleuderung,
      type: 'ernte'
    };
    // Maybe handle async behavior with spinner?
    // but as the resolving is fast it may be better without
    this.sendSupperMappingService.send(supperMapping).subscribe(i => {
      this.buildDefaultForm();
    }, e => {
      console.error('Error: ' + (e.stack || e));
    });
  }

  private buildDefaultForm() {
    this.form = this.fb.group({
      hiveMark: ['', Validators.required],
      supperMarks: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control('')
      ])
    });
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Playlist, Song} from '../intermediate-data';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  playlist: Playlist = new Playlist();
  song: Song = new Song ();
  do = false;
  hides = false;
  duration = 0;

  constructor(private dialogRef: MatDialogRef<EditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.playlist = this.data.list;
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, { validators: [Validators.required] }),
    });
    this.form2 = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      artist: new FormControl(null, { validators: [Validators.required] }),
      duration: new FormControl(null, { validators: [Validators.required] }),
    });
    this.form.get('name').setValue(this.playlist.name);
    this.form.get('description').setValue(this.playlist.description);

  }

  submit() {
    if (this.form.valid && (this.form2.valid || this.playlist.songs.length !== 0)) {
      if (this.form2.valid) {
        this.song = new Song ();
        this.song.title = this.form2.value.title;
        this.song.artist = this.form2.value.artist;
        this.song.duration = this.form2.value.duration;
        this.playlist.songs.push(this.song);
      }
      this.playlist.songs.forEach((e) => {
        this.duration += e.duration;
      });
      this.playlist.totalDuration = this.duration;
      this.playlist.name = this.form.value.name;
      this.playlist.totalSongs = this.playlist.songs.length;
      this.playlist.description = this.form.value.description;
      this.dialogRef.close(this.playlist);
    }
  }

  add() {
    if (this.form2.valid) {
      this.song = new Song ();
      this.song.title = this.form2.value.title;
      this.song.artist = this.form2.value.artist;
      this.song.duration = this.form2.value.duration;
      this.playlist.songs.push(this.song);
      this.form2.reset();
      this.do = true; }
  }

  delete(sing: Song) {
    const index = this.playlist.songs.findIndex((e) => e.title === sing.title);
    this.playlist.songs.splice(index, 1);
  }

  hide() {
    if (!this.hides) {
    this.hides = true;} else {this.hides = false}
  }

}

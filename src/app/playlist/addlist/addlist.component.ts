import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Playlist, Song} from '../intermediate-data';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})
export class AddlistComponent implements OnInit {

  // MARK: variables

  form: FormGroup;
  form2: FormGroup;
  playlist: Playlist = new Playlist();
  song: Song = new Song ();
  do = false;
  hides = false;
  duration = 0;
  constructor(private dialogRef: MatDialogRef<AddlistComponent>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, { validators: [Validators.required] }),
    });
    this.form2 = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      artist: new FormControl(null, { validators: [Validators.required] }),
      duration: new FormControl(null, { validators: [Validators.required] }),
    });
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
    this.hides = true;
  }
}

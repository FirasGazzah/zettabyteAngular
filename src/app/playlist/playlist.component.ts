import { Component, OnInit } from '@angular/core';
import {Playlist, PlaylistC, Song} from './intermediate-data';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddlistComponent} from './addlist/addlist.component';
import {EditComponent} from './edit/edit.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
playlist: Playlist[]
  constructor(public play: PlaylistC, private dialog: MatDialog) { }

  ngOnInit(): void {
  this.playlist = this.play.playlists;
  }

  addPlayList() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.panelClass = 'dialog';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.maxHeight = '90vh';
    const dialogRef = this.dialog.open(AddlistComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.playlist.push(result)
      }
    });
  }

  delete(sing: Playlist) {
    const index = this.playlist.findIndex((e) => e.name === sing.name);
    this.playlist.splice(index, 1);
  }
  edits(index) {
    const dialogConfig = new MatDialogConfig();
    const list = this.playlist[index];
    dialogConfig.width = '50%';
    dialogConfig.panelClass = 'dialog';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.maxHeight = '90vh';
    const dialogRef = this.dialog.open(EditComponent, {
      data: {list}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.playlist[index] = result;
      }
    });
  }
}

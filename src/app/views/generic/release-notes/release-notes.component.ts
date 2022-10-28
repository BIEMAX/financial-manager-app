import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.css']
})
export class ReleaseNotesComponent implements OnInit {

  public releaseMarkdown: any;
  public listReleases: any;

  constructor(
    private http: HttpClient,
    private mdService: MarkdownService
  ) { }

  ngOnInit (): void {
    this.listReleases = this.getAvailableVersions();
  }

  getAvailableVersions () {
    return [
      { name: "Versões", icon: "" },
      { name: "1.3.0", icon: "new_releases" },
      { name: "1.2.1", icon: "done" },
      { name: "1.2.0", icon: "done" },
      { name: "1.1.5", icon: "done" },
      { name: "1.1.3", icon: "done" },
      { name: "1.1.1", icon: "done" },
      { name: "1.1.0", icon: "done" },
      { name: "1.0.0", icon: "done" }
    ];
  }

  async getReleaseNotes (version: string) {
    let releaseDocName = `/assets/md/release_${version}.md`;
    let tempMd = await this.http.get(releaseDocName, { responseType: 'text' }).toPromise();
    this.releaseMarkdown = this.mdService.parse(tempMd);
  }

  onLoad (data: any) {
    // console.log('onLoad: ', data);
  }

  onError (data: any) {
    // console.log('onError: ', data);
  }

}

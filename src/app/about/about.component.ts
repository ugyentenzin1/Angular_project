import { Component, OnInit } from '@angular/core';
import {leader} from "../shared /leader";
import {LeadersService} from "../Services /leaders.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaderList!: leader[];

  constructor(private leaderService: LeadersService) { }

  ngOnInit(): void {
    this.leaderService.getLeader().subscribe((leader) =>this.leaderList = leader)
  }

}

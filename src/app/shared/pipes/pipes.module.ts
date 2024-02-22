import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterUniquePipe } from './filter-unique.pipe';

@NgModule({
  declarations: [FilterUniquePipe],
  imports: [
    CommonModule
  ],
  exports: [FilterUniquePipe]
})
export class PipesModule { }

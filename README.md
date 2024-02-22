# AngularStarterpack

This is an Angular Boilerplate that can be used to kickstart the development on any Angular project with speed. In the 4 years of working in a service industry, we have built numerous projects and accumulated a lot of learnings from them, that are baked into this boilerplate. Over time, we also noticed certain similarities that repeat themselves in all the projects. We did not necessarily have to re-invent the wheel everytime a new project was started. This boilerplate was all that we would need to get to writing the business logic of the project, the stuff that truly mattered. Using this boilerplate as the base for a project would also force devs to adopt a certian standard set by the boilerplate, thereby ensuring everyone is writing efficient, abstarcted and highly readable code!

In order to set this up:
1 => Change the name of this app from angular-starterpack to whatever you wish to keep.
2 => Have a env folder in your root directory with staging.env and prod.env files in it.
3 => Use your configs whereever there is "YOUR-" prefix.
3 => Run npm install
4 => For staging: npm run start:staging, For prod: npm run start:prod

The boilerplate has/will have the following- 

## Components


1. Linear loader
2. Spinner
3. Pseudo cards (In Progress)
4. Avatar (In Progress)
5. Success/Error Toast Messages (In Progress)
6. Action Buttons (In Progress)
7. Action Modals (In Progress)
8. Error Modals (In Progress)
9. Confirmations Modals

## Directives

1. Limit-to 
2. Search Input 
3. Lazy load images directive 
4. Infinite Scroll 

## Pipes

1. safeHTML 
2. moment parser 
3. join 
4. duration 
5. titlelize 

## Services

1. Authentication (basic scaffolding) (In Progress)
2. User Service (basic scaffolding)
3. Apollo Service
4. Error Service
5. Constants service
6. Validators (In Progress)

## Style components

1. Icon pack (In Progress)
2. Fonts & typography (In Progress)
3. Navbar (In Progress)
4. Animations/Micro interactions (In Progress)
5. Layouts (In Progress)
    1. Grids
    2. Cards
    3. Panels

## Modular Functions

1. DeepCopy 
2. makeDateTime 
3. isObjectEmpty
4. isMobile 
5. getRelativeTime

## Packages
1. @agm/core
2. @angular/animations
3. @angular/cdk
4. @angular/common
5. @angular/compiler
6. @angular/core
7. @angular/forms
8. @angular/material
    1. mat-form-field
        - In Configure Discount Component
        - In Dashboard Component
        - In Restaurant Subscriptions Component
        - In Trade Discount Component
        - In Login Component
    2. mat-icon
        - In Bulk Upload Component
        - In Dashboard Component
        - In Packs Component
        - In Restaurant Subscriptions Component
        - In Upload Data Component
        - In Side nav Component
    3. mat-tab
        - In Dashboard Component
        - In Packs Component
        - In Restaurant Subscriptions Component
    4. mat-radio-button
        - To select Override Copies, Time Slot Restriction on Configure Discount Page
        - To select Override Copies, Time Slot Restriction on Trade Discount Page
    5. mat-checkbox
        - To select list options from list on Packs Component
        - To select list options from list on Restaurant Subscriptions Component
    6. mat-table
        - To display list in tabular format in Dashboard Page
        - To display list in tabular format in Packs Page
        - To display list in tabular format in Restaurant Subscriptions Page
    7. mat-paginator
        - Pagination for Dashboard Page
        - Pagination for Packs Page
        - Pagination for Restaurant Subscriptions Page
    8. mat-datepicker
        - To select Valid From date, Valid Till date in Configure Discount Component
        - To select Start date, End date in Dashboard Component
        - To select Start date, End date in Restaurant subscription Component
        - To select Valid From date, Valid Till date in Trade Discount Component
9. @angular/platform-browser
10. @angular/platform-browser-dynamic
11. @angular/router
12. @ng-select/ng-select
    1. To select Operations in Bulk Upload Page
    2. To select Discount Type in Configure Discount Page
    3. To select Status for filter in Dashboard Page
    4. To select Id, Restaurant Name, Commission , GST No. for filter in Finance Page
    5. To select Offer Coupon in Packs Page
    6. To select Status for filter in Restauranr Subscription Page
    7. To select Discount Type in Trade Discount Page
13. @types/googlemaps
14. bootstrap
15. moment
    1. For Date in Dashboard TS
    2. For Today Date, From Date, To Date in Restaurant Subscription TS
16. ng2-search-filter
17. ngx-bootstrap
18. ngx-material-timepicker
    1. To select Opening Hours, Closing Hours on Configure Discount Component
    2. To select Opening Hours, Closing Hours on Trade Discount Component
19. ngx-toastr
    1. Login Page
    2. Dashboard Page-Status
    3. Trade Discount Page-Create New Trade Discount
    4. Trade Discount Page-Configure Discount
    5. Trade Discount Page-Edit Discount
    6. Bulk Upload Page-Upload
    7. Logout

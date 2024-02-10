# TargoMonitor

# English version below ⬇

## Összefoglaló
TargoMonitor egy adatbáziskezelő webes applikáció olyan cégeknek, akik munkavédelmi ellenőrzéseket végeznek nagy számban emelő- és egyéb gépeken.

## Technológia
Az applikáció .Net Core, EF Core-t használ a backenden, SQL szervert az adatbázishoz, Angulart a frontendhez, Azure-on kerül telepítésre (deploy), és Gittel valamint Githubbal van verziókövetve.

## Feladatok
### Adatbázis
Egy nagy méretű adatbázis a következő táblákkal:
- Partnercégek: a felhasználó partnercégei, a cégek adatai és ezen cégek kapcsolattartói. Itt tároljuk a gépeket amik a céghez tartoznak.
- Kontaktok: A partnercégek kapcsolattartói, minden adatukkal és elérhetőségeikkel.
- Gépek: minden cég összes gépe, a gépek adatai és vizsgálataik.
- Vizsgálatok: minden vizsgálat típusát (IBF, Fővizsgálat, Szerkezeti), idejét, és egy megjegyzést ahova a vizsgálat eredményét lehet írni.

Az adatbázis kapcsolatai:

```
Felhasználó
 ⬇
Cégek
 ├─ Gépek
 │   └─ Vizsgálatok
 └─ Kapcsolattartók
```

### Megjelenítés
Az applikáció jelenítsen meg 3 fület, amelyek mindegyike egy-egy táblához visz:
- Cégek
- Gépek
- Idő szerint szűrt vizsgálatok

Ezek minden sorát ki lehessen nyitni, hogy több információhoz jussunk hozzá (pl. ha egy céget kinyitunk, jelenjenek meg a gépei, ha egy gépet, jelenjenek meg a vizsgálatai).

### Szerkesztés, hozzáadás
Bármikor, bármelyik cellát lehessen szerkeszteni, illetve új sorokat hozzáadni az adatbázishoz.
### Szűrés
Minden táblában mindenre lehessen szűrni. 

### Idő szerinti szűrés
A harmadik ablakban jelenjenek meg a havonta leszűrt gépek amik vizsgálatra szorulnak, utolsó fővizsgálat időpontja és vizsgálati csoportszám szerint.

Ezen az oldalon legyen indikáció azokon a sorokon ahol a vizsgálat már megtörtént.

### Fájlkezelés és generálás
El kell tudnia tárolni minta fájlokat ami alapján pdf vagy word dokumentumok generálhatóak.

### Email szerviz
Képesnek kell lennie emaileket küldenie.


# ==============================

### Summary
TargoMonitor is a database management web application for companies that perform safety inspections on a large number of lifting and other machinery.

### Technology
The application uses .Net Core, EF Core for the backend, SQL server for the database, Angular for the frontend, is deployed on Azure, and version-controlled with Git and Github.

### Tasks
#### Database
A large database with the following tables:
- Partner companies: the user's partner companies, the companies' data, and their contacts. This is where the machines belonging to the company are stored.
- Contacts: The contacts of the partner companies, with all their data and contact information.
- Machines: all machines of every company, the data of the machines, and their inspections.
- Inspections: every type of inspection (IBF, Main inspection, Structural), its timing, and a note where the result of the inspection can be written.

Database relationships:

```
User
 ⬇
Companies
 ├─ Machines
 │   └─ Inspections
 └─ Contacts
```

#### Display
The application should display 3 tabs, each leading to one of the tables:
- Companies
- Machines
- Inspections filtered by time

Each row should be expandable to access more information (e.g., if a company is expanded, its machines appear; if a machine is expanded, its inspections appear).

#### Editing and Adding
Any cell can be edited at any time, and new rows can be added to the database.
#### Filtering
Filtering should be possible in every table on everything.

#### Filtering by Time
The third window should display the machines that require inspection each month, sorted by the last main inspection date and inspection group number.

This page should indicate the rows where the inspection has already been conducted.

#### File Management and Generation
It should be able to store sample files based on which PDF or Word documents can be generated.

#### Email Service
It should be capable of sending emails.
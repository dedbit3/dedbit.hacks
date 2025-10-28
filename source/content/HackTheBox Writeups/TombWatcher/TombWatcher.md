
---
fileClass: Machine
---

<p align="center"> <img src= "https://www.hackthebox.com//avatars/59c74a969b4fec16cd8072d253ca9917.png"> </p>

#machine

## Operation system - Windows
<img style = "max-width:70px" src = "app://local//home/ew/apps/HTNotes/HTB/.res/Windows.png">

## Metadata

|                       |   |
| ----------------      | - |
| ID                    |664 |
| Name                  |TombWatcher |
| Active                |✅  |
| User Flag             |✅ |
| Root Flag             |✅|
| Difficulty Text       |Medium  |
| Stars                 |⭐️ 4.5 |
| Created Note          |08/04/25 |
| Published             |06/07/25 |
| tags                  | |

<p style = "display:none">
id:: 664
active:: True
name:: TombWatcher
os::Windows
user_flag:: True
root_flag:: True
difficulty_text:: Medium
stars:: 4.5
created:: 08/04/2025
published:: 06/07/25
avatar:: /avatars/59c74a969b4fec16cd8072d253ca9917.png
tags:: 
</p>

## Statistics


```chartsview
#-----------------#
#- chart type    -#
#-----------------#
type: Radar

#-----------------#
#- chart data    -#
#-----------------#
data:
  - item: "ENUM"
    user: "user"
    score: 7.3
  - item: "REAL"
    user: "user"
    score: 7
  - item: "CVE"
    user: "user"
    score: 6.9
  - item: "CUSTOM"
    user: "user"
    score: 3.1
  - item: "CTF"
    user: "user"
    score: 3
  - item: "ENUM"
    user: "author"
    score: 0
  - item: "REAL"
    user: "author"
    score: 0
  - item: "CVE"
    user: "author"
    score: 0
  - item: "CUSTOM"
    user: "author"
    score: 0
  - item: "CTF"
    user: "author"
    score: 0

#-----------------#
#- chart options -#
#-----------------#
options:
  xField: "item"
  yField: "score"
  seriesField: "user"
  meta:
    score:
      alias: "Score"
      min: 0
      nice: true
  xAxis:
    line: null
    tickLine: null
  yAxis:
    label: false
    grid:
      alternateColor: "rgba(0, 0, 0, 0.04)"
  point: []
  area: []
```



### User rating


```chartsview
#-----------------#
#- chart type    -#
#-----------------#
type: Column

#-----------------#
#- chart data    -#
#-----------------#
data:
    - folder: "PIECE OF CAKE"
      count: 273
     
    - folder: "VERY EASY"
      count: 206

    - folder: "EASY"
      count: 928
      
    - folder: "NOT TO EASY"
      count: 858
      
    - folder: "MEDIUM"
      count: 1145
     
    - folder: "A BIT HARD"
      count: 647
      
    - folder: "HARD"
      count: 380
      
    - folder: "EXTREMELY HARD"
      count: 110
      
    - folder: "INSANE"
      count: 39
      
    - folder: "BRAINFUCK"
      count: 78

    

#-----------------#
#- chart options -#
#-----------------#
options:
  xField: "folder"
  yField: "count"
  padding: auto
  label:
    position: "middle"
    style:
      opacity: 0.6
      fontSize: 12
  columnStyle:
    fillOpacity: 0.5
    lineWidth: 1
    strokeOpacity: 0.7
    shadowColor: "grey"
    shadowBlur: 10
    shadowOffsetX: 5
    shadowOffsetY: 5
  xAxis:
    label:
      autoHide: false
      autoRotate: true
  meta:
    count:
      alias: "Votes"
```


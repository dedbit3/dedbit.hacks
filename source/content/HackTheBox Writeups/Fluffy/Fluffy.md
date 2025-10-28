
---
fileClass: Machine
---

<p align="center"> <img src= "https://www.hackthebox.com//avatars/ef8fc92ac7cccd8afa4412241432f064.png"> </p>

#machine

## Operation system - Windows
<img style = "max-width:70px" src = "app://local//home/ew/apps/HTNotes/HTB/.res/Windows.png">

## Metadata

|                       |   |
| ----------------      | - |
| ID                    |662 |
| Name                  |Fluffy |
| Active                |✅  |
| User Flag             |✅ |
| Root Flag             |✅|
| Difficulty Text       |Easy  |
| Stars                 |⭐️ 4.4 |
| Created Note          |08/04/25 |
| Published             |05/24/25 |
| tags                  | |

<p style = "display:none">
id:: 662
active:: True
name:: Fluffy
os::Windows
user_flag:: True
root_flag:: True
difficulty_text:: Easy
stars:: 4.4
created:: 08/04/2025
published:: 05/24/25
avatar:: /avatars/ef8fc92ac7cccd8afa4412241432f064.png
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
    score: 7
  - item: "REAL"
    user: "user"
    score: 7.1
  - item: "CVE"
    user: "user"
    score: 6.5
  - item: "CUSTOM"
    user: "user"
    score: 3.5
  - item: "CTF"
    user: "user"
    score: 2.9
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
      count: 251
     
    - folder: "VERY EASY"
      count: 294

    - folder: "EASY"
      count: 1553
      
    - folder: "NOT TO EASY"
      count: 2123
      
    - folder: "MEDIUM"
      count: 1448
     
    - folder: "A BIT HARD"
      count: 739
      
    - folder: "HARD"
      count: 538
      
    - folder: "EXTREMELY HARD"
      count: 174
      
    - folder: "INSANE"
      count: 44
      
    - folder: "BRAINFUCK"
      count: 136

    

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



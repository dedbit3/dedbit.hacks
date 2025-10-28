
---
fileClass: Machine
---

<p align="center"> <img src= "https://www.hackthebox.com//avatars/757eeb9b0f530e71875f0219d0d477e4.png"> </p>

#machine

## Operation system - Linux
<img style = "max-width:70px" src = "app://local//home/ew/apps/HTNotes/HTB/.res/Linux.png">

## Metadata

|                       |   |
| ----------------      | - |
| ID                    |659 |
| Name                  |Environment |
| Active                |✅  |
| User Flag             |✅ |
| Root Flag             |✅|
| Difficulty Text       |Medium  |
| Stars                 |⭐️ 4.1 |
| Created Note          |08/04/25 |
| Published             |05/03/25 |
| tags                  | |

<p style = "display:none">
id:: 659
active:: True
name:: Environment
os::Linux
user_flag:: True
root_flag:: True
difficulty_text:: Medium
stars:: 4.1
created:: 08/04/2025
published:: 05/03/25
avatar:: /avatars/757eeb9b0f530e71875f0219d0d477e4.png
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
    score: 6.6
  - item: "REAL"
    user: "user"
    score: 6.2
  - item: "CVE"
    user: "user"
    score: 5.8
  - item: "CUSTOM"
    user: "user"
    score: 4.2
  - item: "CTF"
    user: "user"
    score: 3.8
  - item: "ENUM"
    user: "author"
    score: 9
  - item: "REAL"
    user: "author"
    score: 8
  - item: "CVE"
    user: "author"
    score: 7
  - item: "CUSTOM"
    user: "author"
    score: 3
  - item: "CTF"
    user: "author"
    score: 2

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
      count: 179
     
    - folder: "VERY EASY"
      count: 156

    - folder: "EASY"
      count: 727
      
    - folder: "NOT TO EASY"
      count: 907
      
    - folder: "MEDIUM"
      count: 869
     
    - folder: "A BIT HARD"
      count: 401
      
    - folder: "HARD"
      count: 191
      
    - folder: "EXTREMELY HARD"
      count: 39
      
    - folder: "INSANE"
      count: 9
      
    - folder: "BRAINFUCK"
      count: 39

    

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



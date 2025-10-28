
---
fileClass: Machine
---

<p align="center"> <img src= "https://www.hackthebox.com//avatars/c9efb253e7d1d9b407113e11afdaa905.png"> </p>

#machine

## Operation system - Linux
<img style = "max-width:70px" src = "app://local//home/ew/apps/HTNotes/HTB/.res/Linux.png">

## Metadata

|                       |   |
| ----------------      | - |
| ID                    |660 |
| Name                  |Planning |
| Active                |✅  |
| User Flag             |✅ |
| Root Flag             |✅|
| Difficulty Text       |Easy  |
| Stars                 |⭐️ 3.8 |
| Created Note          |08/04/25 |
| Published             |05/10/25 |
| tags                  | |

<p style = "display:none">
id:: 660
active:: True
name:: Planning
os::Linux
user_flag:: True
root_flag:: True
difficulty_text:: Easy
stars:: 3.8
created:: 08/04/2025
published:: 05/10/25
avatar:: /avatars/c9efb253e7d1d9b407113e11afdaa905.png
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
    score: 5.5
  - item: "CVE"
    user: "user"
    score: 6
  - item: "CUSTOM"
    user: "user"
    score: 4
  - item: "CTF"
    user: "user"
    score: 4.5
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
      count: 797
     
    - folder: "VERY EASY"
      count: 1015

    - folder: "EASY"
      count: 4015
      
    - folder: "NOT TO EASY"
      count: 2353
      
    - folder: "MEDIUM"
      count: 743
     
    - folder: "A BIT HARD"
      count: 306
      
    - folder: "HARD"
      count: 186
      
    - folder: "EXTREMELY HARD"
      count: 46
      
    - folder: "INSANE"
      count: 13
      
    - folder: "BRAINFUCK"
      count: 76

    

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



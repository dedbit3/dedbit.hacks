
---
fileClass: Machine
---

#machine

## Operation system - Linux
<img style = "max-width:70px" src = "/img/Linux.png">

## Metadata

|                       |   |
| ----------------      | - |
| ID                    |668 |
| Name                  |Artificial |
| Active                |✅  |
| User Flag             |✅ |
| Root Flag             |✅|
| Difficulty Text       |Easy  |
| Stars                 |⭐️ 4.2 |
| Created Note          |08/04/25 |
| Published             |06/21/25 |
| tags                  | |

<p style = "display:none">
id:: 668
active:: True
name:: Artificial
os::Linux
user_flag:: True
root_flag:: True
difficulty_text:: Easy
stars:: 4.2
created:: 08/04/2025
published:: 06/21/25
avatar:: /avatars/e6633d6c2b1d824c3756eb21aeed7590.png
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
    score: 5.6
  - item: "REAL"
    user: "user"
    score: 5.4
  - item: "CVE"
    user: "user"
    score: 5.2
  - item: "CUSTOM"
    user: "user"
    score: 4.8
  - item: "CTF"
    user: "user"
    score: 4.6
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
      count: 631
     
    - folder: "VERY EASY"
      count: 732

    - folder: "EASY"
      count: 2523
      
    - folder: "NOT TO EASY"
      count: 1659
      
    - folder: "MEDIUM"
      count: 640
     
    - folder: "A BIT HARD"
      count: 238
      
    - folder: "HARD"
      count: 194
      
    - folder: "EXTREMELY HARD"
      count: 49
      
    - folder: "INSANE"
      count: 14
      
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



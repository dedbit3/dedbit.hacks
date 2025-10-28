
---
fileClass: Machine
---

#machine

## Operation system - Linux
<img style = "max-width:70px" src = "/img/Linux.png">

## Metadata

|                       |   |
| ----------------      | - |
| ID                    |641 |
| Name                  |UnderPass |
| Active                |❌  |
| User Flag             |✅ |
| Root Flag             |✅|
| Difficulty Text       |Easy  |
| Stars                 |⭐️ 3.8 |
| Created Note          |08/04/25 |
| Published             |12/21/24 |
| tags                  | |

<p style = "display:none">
id:: 641
active:: False
name:: UnderPass
os::Linux
user_flag:: True
root_flag:: True
difficulty_text:: Easy
stars:: 3.8
created:: 08/04/2025
published:: 12/21/24
avatar:: /avatars/456a4d2e52f182847fb0a2dba0420a44.png
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
    score: 6.4
  - item: "REAL"
    user: "user"
    score: 4.8
  - item: "CVE"
    user: "user"
    score: 4.9
  - item: "CUSTOM"
    user: "user"
    score: 5.1
  - item: "CTF"
    user: "user"
    score: 5.2
  - item: "ENUM"
    user: "author"
    score: 8
  - item: "REAL"
    user: "author"
    score: 5
  - item: "CVE"
    user: "author"
    score: 3
  - item: "CUSTOM"
    user: "author"
    score: 7
  - item: "CTF"
    user: "author"
    score: 5

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
      count: 1424
     
    - folder: "VERY EASY"
      count: 2004

    - folder: "EASY"
      count: 6552
      
    - folder: "NOT TO EASY"
      count: 3531
      
    - folder: "MEDIUM"
      count: 993
     
    - folder: "A BIT HARD"
      count: 335
      
    - folder: "HARD"
      count: 245
      
    - folder: "EXTREMELY HARD"
      count: 46
      
    - folder: "INSANE"
      count: 18
      
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



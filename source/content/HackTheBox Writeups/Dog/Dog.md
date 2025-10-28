
---
fileClass: Machine
---

#machine

## Operation system - Linux
<img style = "max-width:70px" src = "/img/Linux.png">

## Metadata

|                       |   |
| ----------------      | - |
| ID                    |651 |
| Name                  |Dog |
| Active                |❌  |
| User Flag             |✅ |
| Root Flag             |✅|
| Difficulty Text       |Easy  |
| Stars                 |⭐️ 3.8 |
| Created Note          |08/04/25 |
| Published             |03/08/25 |
| tags                  | |

<p style = "display:none">
id:: 651
active:: False
name:: Dog
os::Linux
user_flag:: True
root_flag:: True
difficulty_text:: Easy
stars:: 3.8
created:: 08/04/2025
published:: 03/08/25
avatar:: /avatars/426830ea2ae4f05f7892ad89195f8276.png
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
    score: 6.2
  - item: "REAL"
    user: "user"
    score: 5.3
  - item: "CVE"
    user: "user"
    score: 5.9
  - item: "CUSTOM"
    user: "user"
    score: 4.1
  - item: "CTF"
    user: "user"
    score: 4.7
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
      count: 1251
     
    - folder: "VERY EASY"
      count: 1594

    - folder: "EASY"
      count: 4609
      
    - folder: "NOT TO EASY"
      count: 2855
      
    - folder: "MEDIUM"
      count: 1018
     
    - folder: "A BIT HARD"
      count: 399
      
    - folder: "HARD"
      count: 232
      
    - folder: "EXTREMELY HARD"
      count: 69
      
    - folder: "INSANE"
      count: 24
      
    - folder: "BRAINFUCK"
      count: 124

    

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



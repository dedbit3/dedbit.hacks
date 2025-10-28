
---
fileClass: Machine
---

#machine

## Operation system - Linux
<img style = "max-width:70px" src = "/img/Linux.png">

## Metadata

|                       |   |
| ----------------      | - |
| ID                    |672 |
| Name                  |Outbound |
| Active                |✅  |
| User Flag             |✅ |
| Root Flag             |✅|
| Difficulty Text       |Easy  |
| Stars                 |⭐️ 3.6 |
| Created Note          |08/04/25 |
| Published             |07/12/25 |
| tags                  | |

<p style = "display:none">
id:: 672
active:: True
name:: Outbound
os::Linux
user_flag:: True
root_flag:: True
difficulty_text:: Easy
stars:: 3.6
created:: 08/04/2025
published:: 07/12/25
avatar:: /avatars/b1096fc86df3fb6035baad7f599094be.png
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
    score: 5.3
  - item: "REAL"
    user: "user"
    score: 5.7
  - item: "CVE"
    user: "user"
    score: 6
  - item: "CUSTOM"
    user: "user"
    score: 4
  - item: "CTF"
    user: "user"
    score: 4.3
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
      count: 378
     
    - folder: "VERY EASY"
      count: 461

    - folder: "EASY"
      count: 1592
      
    - folder: "NOT TO EASY"
      count: 1710
      
    - folder: "MEDIUM"
      count: 775
     
    - folder: "A BIT HARD"
      count: 310
      
    - folder: "HARD"
      count: 204
      
    - folder: "EXTREMELY HARD"
      count: 58
      
    - folder: "INSANE"
      count: 16
      
    - folder: "BRAINFUCK"
      count: 74

    

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



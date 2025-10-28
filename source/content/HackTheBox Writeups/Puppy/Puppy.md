
---
fileClass: Machine
---

#machine

## Operation system - Windows
<img style = "max-width:70px" src = "/img/Windows.png">

## Metadata

|                       |   |
| ----------------      | - |
| ID                    |661 |
| Name                  |Puppy |
| Active                |✅  |
| User Flag             |✅ |
| Root Flag             |✅|
| Difficulty Text       |Medium  |
| Stars                 |⭐️ 4.8 |
| Created Note          |08/04/25 |
| Published             |05/17/25 |
| tags                  | |

<p style = "display:none">
id:: 661
active:: True
name:: Puppy
os::Windows
user_flag:: True
root_flag:: True
difficulty_text:: Medium
stars:: 4.8
created:: 08/04/2025
published:: 05/17/25
avatar:: /avatars/6a127b39657062e42c1a8dfdcd23475d.png
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
    score: 7.6
  - item: "REAL"
    user: "user"
    score: 7.2
  - item: "CVE"
    user: "user"
    score: 6
  - item: "CUSTOM"
    user: "user"
    score: 4
  - item: "CTF"
    user: "user"
    score: 2.8
  - item: "ENUM"
    user: "author"
    score: 9
  - item: "REAL"
    user: "author"
    score: 7
  - item: "CVE"
    user: "author"
    score: 7
  - item: "CUSTOM"
    user: "author"
    score: 3
  - item: "CTF"
    user: "author"
    score: 3

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
      count: 198
     
    - folder: "VERY EASY"
      count: 198

    - folder: "EASY"
      count: 968
      
    - folder: "NOT TO EASY"
      count: 1505
      
    - folder: "MEDIUM"
      count: 1736
     
    - folder: "A BIT HARD"
      count: 866
      
    - folder: "HARD"
      count: 552
      
    - folder: "EXTREMELY HARD"
      count: 132
      
    - folder: "INSANE"
      count: 37
      
    - folder: "BRAINFUCK"
      count: 83

    

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


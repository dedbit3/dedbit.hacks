
---
fileClass: Machine
---

<p align="center"> <img src= "https://www.hackthebox.com//avatars/635619778e50cc8f69df91cc6ae149c4.png"> </p>

#machine

## Operation system - Windows
<img style = "max-width:70px" src = "app://local//home/ew/apps/HTNotes/HTB/.res/Windows.png">

## Metadata

|                       |   |
| ----------------      | - |
| ID                    |670 |
| Name                  |Voleur |
| Active                |✅  |
| User Flag             |✅ |
| Root Flag             |✅|
| Difficulty Text       |Medium  |
| Stars                 |⭐️ 4.8 |
| Created Note          |08/04/25 |
| Published             |07/05/25 |
| tags                  | |

<p style = "display:none">
id:: 670
active:: True
name:: Voleur
os::Windows
user_flag:: True
root_flag:: True
difficulty_text:: Medium
stars:: 4.8
created:: 08/04/2025
published:: 07/05/25
avatar:: /avatars/635619778e50cc8f69df91cc6ae149c4.png
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
    score: 7.9
  - item: "REAL"
    user: "user"
    score: 7.4
  - item: "CVE"
    user: "user"
    score: 6.4
  - item: "CUSTOM"
    user: "user"
    score: 3.6
  - item: "CTF"
    user: "user"
    score: 2.6
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
      count: 108
     
    - folder: "VERY EASY"
      count: 87

    - folder: "EASY"
      count: 428
      
    - folder: "NOT TO EASY"
      count: 558
      
    - folder: "MEDIUM"
      count: 874
     
    - folder: "A BIT HARD"
      count: 501
      
    - folder: "HARD"
      count: 311
      
    - folder: "EXTREMELY HARD"
      count: 96
      
    - folder: "INSANE"
      count: 23
      
    - folder: "BRAINFUCK"
      count: 36

    

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



```button
name Update this Machine info
type link
action obsidian://shell-commands/?vault=HTB&execute=g7sm2q030y
templater true
```


import { join } from 'lodash-es'
import name from '@/scripts/utils'
import $ from 'jQuery'
// 等价于 import name from 'src/scripts/utils.js'


import './style/index.css'
function createElement() {
    const div = document.createElement('div')
    div.innerText = join(['i', 'am', 'wangyiyang'], ' ')
    div.className = 'box'
    return div
}

document.body.appendChild(createElement())
$('.box').hide()
console.log('utils导出的数据是: ', name)


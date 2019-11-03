import { join } from 'lodash-es'
import utils from '@/scripts/utils'
import $ from 'jQuery'
// 等价于 import utils from 'src/scripts/utils.js'

import './style/index.css'
function createElement() {
    const div = document.createElement('div')
    div.innerText = join(['i', 'am', 'wangyiyang'], ' ')
    div.className = 'box'
    return div
}

document.body.appendChild(createElement())
$('.box').hide()
console.log('utils导出的数据是: ', utils.name)
utils.getData()


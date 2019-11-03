export default {
    name: '木子',
    getData() {
        fetch('/wyyApi/test').then(res => res.json()).then(data => {
            console.log('请求到的数据是: ', data)
        })
    }
}
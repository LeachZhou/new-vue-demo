function Vue (options) {
    this.vm = this
    this.data = options.data

    // 将data数据循环处理成响应式数据
    for (const key of Object.keys(this.data)) {
        proxyKeys(this.data, key)
    }

    observe(this.data)

    new Compile(options.el, this.vm)

    return this
}

function proxyKeys (obj, prop) {
    Object.defineProperty(obj, prop, {
        configurable: true,
        enumerable: true,
        get () {
            return obj[prop]
        },
        set (newVal) {
            obj[prop] = newVal
        }
    })
}

export default Vue
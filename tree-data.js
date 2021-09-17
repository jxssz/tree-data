function isArray(data) {
	return Object.prototype.toString.call(data) == '[object Array]'
}
function isType(data) {
	return Object.prototype.toString.call(data).slice(8, -1)
}

function treeData(data, options = {}) {
	if (!isArray(data)) {
		return new Error(`传入的数据 ${data} 不是一个Array类型`)
	}

	const PID = options.parentId || ''
	const ID = options.id || ''
	const Deep = options.deepCopy || true

	let list = Deep ? JSON.parse(JSON.stringify(data)) : data

	// 映射表
	let mapping = list.reduce(function (obj, item, index) {
		obj[item[ID]] = index
		return obj
	}, {})

	list.forEach(item => {
		if (!item[PID]) {
			return
		}
		// 用映射表找到父元素
		let parent = list[mapping[item[PID]]]
		parent.children = [...(parent.children || []), item]
		item._record = true // 记录
	})

	return list.filter(i => !i._record)
}

export {
	treeData
}

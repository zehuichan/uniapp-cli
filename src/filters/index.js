// set function parseTime,formatTime to filter
export {parseTime, formatTime} from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}


// 格式化金额,单位:分(eg:430分=4.30元)
export function format(price, digits = 2, prefix = '', suffix = '') {
  if (!price) {
    return 0
  }
  return prefix + Number(price / 100).toFixed(digits) + suffix
}

// 隐藏手机号中间4位
export function formatPhone(phone) {
  phone += ''
  return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
}

// 隐藏身份证号中11位
export function formatIdentity(number) {
  number += ''
  return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
}

export function formatStatus(val) {
  return ['接单中', '行程中', '已完成', '已取消'][val]
}

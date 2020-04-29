import Vue from 'vue'
import store from './store/index'

import TIM from 'tim-wx-sdk'
import COS from 'cos-wx-sdk-v5'

// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
const tim = TIM.create({
  SDKAppID: '1400353447'
})

// 设置 SDK 日志输出级别
tim.setLogLevel(4)

// 注册 COS SDK 插件
tim.registerPlugin({'cos-wx-sdk': COS})

// 监听事件
tim.on(TIM.EVENT.SDK_READY, function (event) {
  // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
  // event.name - TIM.EVENT.SDK_READY
  console.log('SDK_READY', event)
})


tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (event) {
  // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
  // event.name - TIM.EVENT.MESSAGE_RECEIVED
  // event.data - 存储 Message 对象的数组 - [Message]
  console.log('MESSAGE_RECEIVED', event)
})

tim.on(TIM.EVENT.MESSAGE_REVOKED, function (event) {
  // 收到消息被撤回的通知
  // event.name - TIM.EVENT.MESSAGE_REVOKED
  // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
  console.log('MESSAGE_REVOKED', event)
})

tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function (event) {
  // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
  // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
  // event.data - 存储 Conversation 对象的数组 - [Conversation]
  console.log('CONVERSATION_LIST_UPDATED', event)
})

tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function (event) {
  // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
  // event.name - TIM.EVENT.GROUP_LIST_UPDATED
  // event.data - 存储 Group 对象的数组 - [Group]
  console.log('GROUP_LIST_UPDATED', event)
})

tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, function (event) {
  // 收到新的群系统通知
  // event.name - TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED
  // event.data.type - 群系统通知的类型，详情请参见 GroupSystemNoticePayload 的 operationType 枚举值说明
  // event.data.message - Message 对象，可将 event.data.message.content 渲染到到页面
  console.log('GROUP_SYSTEM_NOTICE_RECEIVED', event)
})

tim.on(TIM.EVENT.PROFILE_UPDATED, function (event) {
  // 收到自己或好友的资料变更通知
  // event.name - TIM.EVENT.PROFILE_UPDATED
  // event.data - 存储 Profile 对象的数组 - [Profile]
  console.log('PROFILE_UPDATED', event)
})

tim.on(TIM.EVENT.BLACKLIST_UPDATED, function (event) {
  // 收到黑名单列表更新通知
  // event.name - TIM.EVENT.BLACKLIST_UPDATED
  // event.data - 存储 userID 的数组 - [userID]
  console.log('BLACKLIST_UPDATED', event)
})

tim.on(TIM.EVENT.ERROR, function (event) {
  // 收到 SDK 发生错误通知，可以获取错误码和错误信息
  // event.name - TIM.EVENT.ERROR
  // event.data.code - 错误码
  // event.data.message - 错误信息
  console.log('ERROR', event)
})

tim.on(TIM.EVENT.SDK_NOT_READY, function (event) {
  // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
  // event.name - TIM.EVENT.SDK_NOT_READY
  console.log('SDK_NOT_READY', event)
})

tim.on(TIM.EVENT.KICKED_OUT, function (event) {
  // 收到被踢下线通知
  // event.name - TIM.EVENT.KICKED_OUT
  // event.data.type - 被踢下线的原因，例如:
  //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
  //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
  //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢
  console.log('KICKED_OUT', event)
})
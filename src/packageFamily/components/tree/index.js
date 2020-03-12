Component({
  properties: {
    list: {
      type: Array,
      default: []
    },
    type: String
  },
  methods: {
    handleClickNode: function (e) { // detail对象，提供给事件监听函数
      const dataset = e.currentTarget.dataset
      const myEventDetail = {
        ...dataset
      }
      const myEventOption = { // 触发事件的选项
        bubbles: true,
        composed: true
      }
      this.triggerEvent('choosenode', myEventDetail, myEventOption)
    },
    handleClickMateNode: function(e) {
      const dataset = e.currentTarget.dataset
      const myEventDetail = {
        ...dataset
      }
      const myEventOption = { // 触发事件的选项
        bubbles: true,
        composed: true
      }
      this.triggerEvent('choosenode', myEventDetail, myEventOption)
    }
  }
})

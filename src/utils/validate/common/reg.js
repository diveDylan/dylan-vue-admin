const reg = {
  email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  emailList: /^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*\;)*(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
  enAndNum: /^[a-z0-9]{8}$/i
}

export default reg

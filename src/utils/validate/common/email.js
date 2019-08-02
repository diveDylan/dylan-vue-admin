import reg from './reg'
export default {
   // 郵箱
   email: {
    isRequired: { required: true, trigger: 'blur', message: '請輸入電子郵件信箱' },
    reg: { pattern: reg.emailList, trigger: 'blur', message: '電子郵件信箱輸入有誤，請重新輸入！' }
  },
}
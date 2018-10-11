<template>
    <div>
      {{str}}
    </div>
</template>

<script>
  export default {
   props: {
     time: {
       type: [String, Number]
     }
   },
    data(){
     return{
       str:'',
       timestap:''
     }
    },
    methods:{
     getTimestap(){
       let time = new Date(this.time)
       this.timestap = Math.round(time.getTime()/1000)
       return this.timestap
     },
      getNownuix(){
       const time = new Date()
        const nuix = Math.round(time.getTime()/1000)
        return nuix
      },
      getTodaynuix(){
        const time = new Date()
        time.setHours(0)
        time.setMinutes(0)
        time.setSeconds(0)
        time.setMilliseconds(0)
        const nuix = Math.round(time.getTime()/1000)
        return nuix
      },
      getTimestr(){
       let timestap = this.getTimestap()
       let nowstap = this.getNownuix()
       let todaystap = this.getTodaynuix()
        if(nowstap - timestap >=0 && nowstap - timestap < 3600){
          this.str = Math.round((nowstap - timestap )/60) + '分前'
        }else if(timestap - todaystap >= 0 ){
          this.str = Math.round((timestap - todaystap )/3600) + '小时前'
        }else if(nowstap - timestap >=86400 && nowstap - timestap < 86400*31){
          this.str = Math.round((nowstap - timestap )/86400) + '天前'
        }else{
          let time = new Date(this.time)
          const year = time.getFullYear()
          const months  = time.getMonth()
          const day = time.getDate()
          return this.str = `${year}年${months}月${day}日`
        }
      }
    },
    watch:{
     time(){
       this.getTimestr();
     }
    },
    mounted(){
      this.getTimestr();
    }
  };
</script>

<style scoped>

</style>

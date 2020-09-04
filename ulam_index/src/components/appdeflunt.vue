<script src="../../../brhk_index/src/router/index.js"></script>
<script>
    export default {
        name: "appdeflunt",
        created() {
            if (window.plus) {
                window.plus.navigator.setStatusBarStyle('white')
            }

            let user = JSON.parse(localStorage.getItem('user'));

            let reg = new RegExp("(^|&)" + 'isflag' + "=([^&]*)(&|$)");
            let nums = window.location.search.substr(1).match(reg);

            if (nums) {
                if (nums[2] == 0) {
                    if (user) {
                        this.$router.push('/index');
                    } else {
                        this.$router.push('/zhu');
                    }


                } else if (nums[2] == 1) {
                    let reg = new RegExp("(^|&)" + 'item' + "=([^&]*)(&|$)");
                    let obj = window.location.search.substr(1).match(reg);
                    let reg1 = new RegExp("(^|&)" + 'timer' + "=([^&]*)(&|$)");
                    let obj1 = window.location.search.substr(1).match(reg1);
                    this.$router.push({
                        path: '/end_live',
                        query: {
                            Name: obj[2],
                            timer: obj1[2],
                        }
                    });
                }
            } else {
                if (user) {
                    this.$router.push('/index');
                } else {
                    this.$router.push('/zhu');
                }
            }

        }
    }
</script>



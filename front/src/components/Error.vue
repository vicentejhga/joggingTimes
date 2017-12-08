 <template> 
		<div class="danger"> 
			{{message}}
		</div>
	
</template>

 

<script>

export default {
  	name: 'Error',
   	data () { 
    	return {
        	message: ''
    	}  
	},
	 
		setMessage:function (msg) {
			this.message = 'here we are';
			console.log(this.message);
			}
		}
	

	

</script>


<style scoped>
 
    .danger{
        background-color: #f2dede;
    }

</style>

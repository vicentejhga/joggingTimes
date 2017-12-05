 <template>
	<div class="nav">
		<ul id="menu">
			<a href="#" title="Texto"><li>Times</li></a>
			<a href="#" title="Texto"><li>Texto</li></a>
			<a href="#" title="Texto"><li>Texto</li></a>
			<a href="#" title="Texto"><li>Texto</li></a>
			<a href="#" title="Texto"><li>Log out</li></a>
		</ul>
	</div>
</template>

 

<script>


export default {
  name: 'Header'
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	div.nav {
		overflow:auto;
	}

	#menu {
		width:500px;
		margin:0 auto;
	}

 	#menu li {
		float: left;
		display: inline;
		position: relative;
		margin:0 1px;
		width:98px;
		min-height:19px;
		text-align:center;
		background:#BBB;
		list-style:none;
		padding:2px 0;
	}

	#menu li:hover {
		background:#3863a0;
	}

	#menu  a{
		font:bold 11px Arial, Helvetica, sans-serif;
		color:#FFF;
		text-decoration:none;
	}

</style>

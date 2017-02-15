<template>
<div class="new" style="overflow-y:scroll;">
	<div class="form">
		<ul>
			<li><input class="text" type="text" placeholder='标题'></li>
			<li><input class="text" type="text" placeholder='副标题'></li>
			<li><input class="text" type="text" placeholder='关键字'></li>
			<li>
				<input class="text" type="text" placeholder='作者'>
				<input class="text" type="text" placeholder='来源'>
			</li>
			<li><textarea class="text" type="text" placeholder='描述'></textarea></li>
			<li>
				<div class="select">
					<select>
					  <option selected>请选择部门</option>
					  <option>B</option>
					  <option>C</option>
					</select>
				</div>
			</li>
			<li>
				<div class="select">
					<select>
					  <option selected>请选择频道</option>
					  <option>B</option>
					  <option>C</option>
					</select>
				</div>
			</li>
			<li>
				<div class="select">
					<select>
					  <option selected>请选择栏目</option>
					  <option>B</option>
					  <option>C</option>
					</select>
				</div>
			</li>
			<li>
				富文本
			</li>
			<li>
				<input class="text" type="text" placeholder='扩展字段'>
				<i class="add"></i>
			</li>
			<li>
				<label for='one'><input id='one' name='send' type="radio">发布</label>
				<label for='two'><input id='two' name='send' type="radio">不发布</label>
			</li>
			<li>
				<input type='date' v-model='date' >
			</li>
		</ul>
		<div class="submit">
			<div class="btn">提交</div>
			<div class="btn">保存草稿箱</div>
		</div>
	</div>
</div>
</template>
<script>
	export default {
		name : 'add',
		components : {
			
		},
		props : {

		},
		data (){
			return {
				date : new Date()
			}
		},
		mounted(){
			this.date = '2017/01/01'
		}
	}
</script>
<style lang='sass'>
</style>
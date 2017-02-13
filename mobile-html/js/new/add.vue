<template>
<div class="add">
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
				<label for='one'><input id='one' name='send' type="radio" v-model="picked">发布</label>
				<label for='two'><input id='two' name='send' type="radio" v-model="picked">不发布</label>
			</li>
			<li>
				<input type='date' placeholder='定时发布'>
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
				
			}
		},
		ready(){

		}
	}
</script>
<style lang='sass'>
$s1:.0625rem;$s2:.125rem;$s3:.1875rem;$s4:.25rem;$s5:.3125rem;$s6:.375rem;$s7:.4375rem;$s8:.5rem;$s9:.5625rem;$s10:.625rem;$s11:.6875rem;$s12: .75rem;$s13: .8125rem;$s14: .875rem;$s15: .9375rem;$s16: 1rem;$s17: 1.0625rem;$s18 : 1.125rem;$s19 : 1.1875rem;
$s20 : 1.25rem;
$s21 : 1.3125rem;
$s22 : 1.375rem;
$s23 : 1.4375rem;
$s25 : 1.5625rem;
$s28 : 1.75rem;
$s30 : 1.875rem;
$s35 : 2.1875rem;
$s40 : 2.5rem;$s50 : 3.125rem;$s60 : 3.75rem;$s70 : 4.375rem;$s80 : 5.0rem;$s90 : 5.625rem; $s100 : 6.25rem;

$browser : webkit;

@mixin box-sizing ($sizing:border-box) {
    -webkit-box-sizing:$sizing;
            box-sizing:$sizing;
}

@mixin box{
	display: -webkit-box;
    display: -webkit-flexbox;
    display: flexbox;
}
@mixin box-flex( $val :1 ){
    box-flex:$val;
    @each $key in $browser {
        -#{$key}-box-flex:$val;
    }
}
@mixin box-orient( $val : vertical ){
    box-orient:$val;
    @each $key in $browser {
        -#{$key}-box-orient:$val;
    }
}
%icon:before {
  font-family: "icons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon--down:before {
	content: "\e600";
}

// Icon font
@font-face {
  font-family: 'icons';
	src: url(data:application/font-woff;charset=utf-8;base64,d09GRk9UVE8AAARgAAoAAAAABBgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAANgAAADYZbVvCE9TLzIAAAHMAAAAYAAAAGAIIvy2Y21hcAAAAiwAAABMAAAATBpVzFdnYXNwAAACeAAAAAgAAAAIAAAAEGhlYWQAAAKAAAAANgAAADYAl8viaGhlYQAAArgAAAAkAAAAJANuAeZobXR4AAAC3AAAABQAAAAUAwAAdG1heHAAAALwAAAABgAAAAYABVAAbmFtZQAAAvgAAAFFAAABRVcZpu5wb3N0AAAEQAAAACAAAAAgAAMAAAEABAQAAQEBCGljb21vb24AAQIAAQA6+BwC+BsD+BgEHgoAGVP/i4seCgAZU/+LiwwHi2v4lPh0BR0AAAB2Dx0AAAB7ER0AAAAJHQAAAM8SAAYBAQgPERMWG2ljb21vb25pY29tb29udTB1MXUyMHVFNjAwAAACAYkAAwAFAQEEBwoNTPyUDvyUDvyUDvuUDvgg958VgYD7AiOLi4aFg4iEi4SLg46GkYuL+wLzgZaAloqel5eWlpqMmX8I7yvv6wWZl5qKloCXf4p4gIAIDviUFPiUFYsMCgADAgABkAAFAAABTAFmAAAARwFMAWYAAAD1ABkAhAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOYAAeD/4P/gAeAAIAAAAAEAAAAAAAAAAAAAACAAAAAAAAIAAAADAAAAFAADAAEAAAAUAAQAOAAAAAoACAACAAIAAQAg5gD//f//AAAAAAAg5gD//f//AAH/4xoEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAQAAss1nQF8PPPUACwIAAAAAAM/2xdgAAAAAz/bF2AAAAAABjAE1AAAACAACAAAAAAAAAAEAAAHg/+AAAAIAAAAAAAGMAAEAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAQAAAAIAAHQAAFAAAAUAAAAAAA4ArgABAAAAAAABAA4AAAABAAAAAAACAA4ARwABAAAAAAADAA4AJAABAAAAAAAEAA4AVQABAAAAAAAFABYADgABAAAAAAAGAAcAMgABAAAAAAAKADQAYwADAAEECQABAA4AAAADAAEECQACAA4ARwADAAEECQADAA4AJAADAAEECQAEAA4AVQADAAEECQAFABYADgADAAEECQAGAA4AOQADAAEECQAKADQAYwBpAGMAbwBtAG8AbwBuAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuAFIAZQBnAHUAbABhAHIAaQBjAG8AbQBvAG8AbgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format('woff');
	font-weight: normal;
	font-style: normal;
}
$select-padding: 0.5em;
.container{ overflow-y:scroll; }
	.form{ font-size: $s14;
		ul{ margin-bottom: $s10; padding:0 $s10; border-top:$s1 solid #ddd; border-bottom:$s1 solid #ddd; background:#fff; }
		li{ @include box; padding:$s5 0;
			>input[type='text'],>input[type='date'],>label,>textarea{ display:block; @include box-flex; height:$s25; line-height:$s25;
				border:$s1 solid #ddd; padding:$s4;
			}
			>textarea{ display: block; width:100%; height:$s60; padding:$s5; @include box-sizing; -webkit-appearance: none; }
			>label{ border:none; }
			>input{
				&:not(:first-child){ margin-left:$s10; };
			}
			input{
				background:#fff;-webkit-appearance: none;
				&[type='radio']{ margin-right: $s5; }
			}
			select{ display: block;  }
		}

		.select{
		  display: block; /* 1 */
		  width:100%; @include box-sizing;
		  position: relative; /* 2 */
		  vertical-align: middle; /* 3 */
		  padding: 0; /* 4 */
		  overflow: hidden; /* 5 */
		  
		  // Custom Styling
		  background:#fff;
		  color:#555;
		  border:$s1 solid #ddd;
		  text-shadow: none;
		  border-radius:$s4;

		  &:hover{
		    box-shadow : 0 1px 4px rgba(#000, 0.15);
		  }

		  @extend %icon; /* 6 */
		  @extend .icon--down; /* 6 */

		  &:before{
		    position: absolute; /* 7 */
		    top: $select-padding; /* 7 */
		    right: $select-padding; /* 7 */
		    pointer-events: none; /* 8 */
		  }

		  select{
		  	width:100%; @include box-sizing;
		    padding: $select-padding; /* 10 */
		    padding-right: $select-padding + 1.5em; /* 11 */
		    border: none; /* 13 */
		    background: transparent; /* 13 */
		    background-image: none; /* 13 */
		    -webkit-appearance: none; /* 13 */
		       -moz-appearance: none; /* 13 */
		            appearance: none; /* 13 */

		    // Mozilla Hack
		    text-indent: 0.01px; /* 14 */
		    text-overflow: ''; /* 14 */
		    
		    &:focus{
		      outline:none; /* 16 */
		    }
		  }
		}


		.submit{
			  @include box; padding:$s10;
			 .btn{ display:block; @include box-flex; text-align: center;
			 	height:$s35; line-height: $s35; background:#f85200; border-radius: $s3; color:#fff; font-size: $s14;
			 	&:not(:first-child){ margin-left:$s10; };
			 	&:hover{ background: #ff4e00 };
			 }
		}
	}


</style>
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
				<select v-model="selected">
				  <option>请选择部门</option>
				  <option>B</option>
				  <option>C</option>
				</select>
			</li>
			<li>
				<select v-model="selected">
				  <option>请选择频道</option>
				  <option>B</option>
				  <option>C</option>
				</select>
			</li>
			<li>
				<select v-model="selected">
				  <option>请选择栏目</option>
				  <option>B</option>
				  <option>C</option>
				</select>
			</li>
			<li>
				富文本
			</li>
			<li>
				<input class="text" type="text" placeholder='扩展字段'>
				<i class="add"></i>
			</li>
			<li>
				<label><input type="radio">发布</label>
				<label><input type="radio">不发布</label>
			</li>
			<li>
				定时发布时间 
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
/* public */
@mixin border( $color:#DBDBDB , $size:bottom ){
	background-image: -webkit-linear-gradient(90deg,$color,$color 50%,transparent 50%);
	background-image: -moz-linear-gradient(90deg,$color,$color 50%,transparent 50%);
	background-image: -o-linear-gradient(90deg,$color,$color 50%,transparent 50%);
	background-image: linear-gradient(0,$color,$color 50%,transparent 50%);
	background-size: 100% 1px;
	background-repeat: no-repeat;
	background-position: $size
}
@mixin contain($img , $contain:contain){
	background: url($img) no-repeat;
	background-size: $contain; 
}
@mixin animation( $name , $time:.5s , $move:infinite , $line:linear ){
	animation: $name $time $move $line;
    @each $key in $browser {
        -#{$key}-animation:$name $time $move $line;
    }
}
@mixin box{
	display: -webkit-box;
    display: -webkit-flexbox;
    display: flexbox;
}
@mixin flex( $val :0 ){
    flex-shrink: $val ;
    @each $key in $browser {
        -#{$key}-flex-shrink:$val;
    }
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
@mixin boxCenter( $val : center ){
	box-pack: $val;
    justify-content:$val;
    @each $key in $browser {
        -#{$key}-box-pack:$val;
        -#{$key}-justify-content:$val;
    }
}
@mixin boxMiddle( $val : center ){
	box-align: $val;
    align-content:$val;
    @each $key in $browser {
        -#{$key}-box-align:$val;
        -#{$key}-align-content:$val;
    }
}
@mixin align-items( $val : center){
    align-items : $val;
    @each $key in $browser {
        -#{$key}-align-items:$val;
    }
}
@mixin flex-grow( $val : 1){
    flex-grow : $val; -webkit-flex-grow : $val
}
@mixin box-sizing ($sizing:border-box) {
    -webkit-box-sizing:$sizing;
            box-sizing:$sizing;
}

@mixin transition-property( $val , $b ){
    transition-property: $val;
    @each $key in $browser {
        @if $b{
            -#{$key}-transition-property:-#{$key}-$val;
        }@else{
            -#{$key}-transition-property:$val;
        }
    }
}
@mixin transition-duration( $val:.3s ){
    transition-duration : $val;
    @each $key in $browser {
        -#{$key}-transition-duration:$val;
    }
}
@mixin transform( $val ){
    transform : $val;
    @each $key in $browser {
        -#{$key}-transform:$val;
    }
}
@mixin animation($val){
    animation : $val;
    @each $key in $browser {
        -#{$key}-animation:$val;
    }
}

$minDevice: -webkit-min-device-pixel-ratio;
$maxDevice: -webkit-max-device-pixel-ratio;
@mixin size( $key , $val , $device:1 ){
    @if $device == 1080{
        $val : $val/2.88;
    }
    $val : $val/16px * 1rem;
    #{$key} :  $val;
    @media only screen and (min-device-width : 320px) and (max-device-width : 340px) and (orientation : portrait) and ($minDevice:1) and ($maxDevice:2) {
        #{$key}: $val*.85714285714285714;
    }
    @media only screen and (min-device-width : 240px) and (max-device-width : 600px) and (orientation : portrait) and ($minDevice:0.75) and ($maxDevice:1.9){
        #{$key}: $val*.85714285714285714;
    }

    //iphone 6 plus
    @media only screen and (min-device-width : 410px) and (max-device-width : 500px) and (orientation : portrait) and ($minDevice:2.5) and ($maxDevice:4.0){
        #{$key}: $val*1.105;
    }
}
@mixin font-size( $val ){
	@include size(font-size,$val)
}
	.form{
		ul{ margin-bottom: $s10; padding:0 $s10; border-top:$s1 solid #ddd; border-bottom:$s1 solid #ddd; background:#fff; }
		li{ @include box; padding:$s5 0;
			input,select,label{ display:block; @include box-flex; height:$s25; line-height:$s25;
				border:$s1 solid #ddd; padding:$s4;
			}
			select{ display: block;  }
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
#!/bin/bash
# 双击运行或者使用bash程序运行

#文件缺失的处理
file_missing(){
  echo "配置失败，文件夹或文件缺失"
  exit 1
}
# 文件检查
files_check(){
  files=$1
  for file in ${files[*]}
  do
      #echo "${file}"
  #    file="${flavor_dir}${file}"
      file="${file}"
      echo -e "${file} \c"

      if [ -e ${file} ]
      # if [ -e ${file} -a -f ${file} ]
      # if [ -d ${file} ]
      then
        echo "文件存在"
      else
        echo "文件不存在"
        file_missing
      fi
  done
}
# 文件夹检查
dir_check(){
  dir=$1
  echo -e "${dir} \c"
  dir_exist $1
  if [ $? -eq 0 ]
  then
    file_missing
  fi
}

# 文件夹存在
dir_exist(){
  dir=$1
  echo -e "${dir} \c"
  if [ -e ${dir} -a -d ${dir} ]
  then
      echo "文件夹存在"
      return 1
  else
      echo "文件夹不存在"
      return 0
  fi
}

#文件删除
files_del(){
  files=$1
  for file in ${files[*]}
  do
      file="${file}"
      echo "del ${file}"
      if [ -e ${file} -a -f ${file} ]; then
      rm ${file}; 
      else
      echo "${file}不存在"
      fi
  done
}
#文件复制
files_cp(){
  files=$1
  dir=$2
  for file in ${files[*]}
  do
      file="${file}"
      echo "${file} => ${dir}"
      cp ${file} ${dir}
  done
}

#切换到bash文件所在目录
cd $(dirname $0)
#path=`pwd`
#echo "脚本所在目录${path}"

flavor=''
# 获取是否有参数传入
if [ -n "$1" ]; then
    echo "配置flavor:$1"
    flavor=$1
else
    # 提醒用户输入flavor名称
    echo -e "输入flavor名称:\c"
    read flavor
fi

# 根据输入，寻找相应的文件夹 （ 默认文件夹路径  ./[flavor name]）
# 检查文件夹是否存在
# 检查文件夹中的文件是否齐全
# 检查目标文件夹是否存在，不存在则创建
echo "开始检查文件完整性！"

flavor_dir="./$flavor/"
dir_check "${flavor_dir}"

file_array1=(
"${flavor_dir}images/*"
)

file_target_dir1="../src/images/"

# file_array1_target=(
# )

files_check "${file_array1[*]}"

# dir_check "${file_target_dir1}"

echo "文件完整性检查成功！开始进行复制！"

# 创建输出目录
dir_exist ${file_target_dir1}
if [ $? -eq 0 ]
then
   echo "目标文件夹不存在！开始创建！"
   mkdir -p ${file_target_dir1}
fi

# 删除目标目录中的相应文件
# files_del "${file_array1_target[*]}"
echo "删除目录下所有文件 ${file_target_dir1}/*"
rm  -rf ${file_target_dir1}/*

#将文件夹中的文件复制到相应的位置，同时界面输出复制情况
#cp ${file_array1[0]} ${file_target_dir1}
# files_cp "${file_array1[*]}" "${file_target_dir1}"
cp -r ${file_array1[*]} $file_target_dir1

#完成后给出结果说明
echo "配置成功！"
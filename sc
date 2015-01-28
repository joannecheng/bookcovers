export PROCESSING_PATH=/Applications/Processing.app/Contents/Java
export PROCESSING_CLASS_PATH=./*
export PROCESSING_CLASS_PATH=$PROCESSING_CLASS_PATH:$PROCESSING_PATH/modes/java/libraries/pdf/library/*

scala -cp $PROCESSING_CLASS_PATH $1

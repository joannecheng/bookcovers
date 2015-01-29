export PROCESSING_HOME=/Applications/Processing.app/Contents/Java/
export PROCESSING_CLASS_PATH=$PROCESSING_HOME/core.jar:$PROCESSING_HOME/modes/java/libraries/pdf/library/*

scala -cp $PROCESSING_CLASS_PATH $1

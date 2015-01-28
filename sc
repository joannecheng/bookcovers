export PROCESSING_HOME=Applications/Processing.app/Contents/Java/
export PROCESSING_CLASS_PATH=lib/*.jar

scala -cp $PROCESSING_CLASS_PATH $1

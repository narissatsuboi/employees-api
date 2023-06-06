# update kubeconfig 
# https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html

aws eks update-kubeconfig --region us-east-1 --name my-cluster

# test connection by listing services 
kubectl get svc

# create namespaces for each microservice
kubectl create namespace ms1
kubectl create namespace ms2


# list nodes by ng 
kubectl get nodes -l eks.amazonaws.com/nodegroup=service1-ng


# apply manifest for ms1 deployment
kubectl apply -f ms1-deployment.yaml

# verify pod(s) are running on selected node
kubectl get pods -n ms1 --output=wide

## run app 
# ssh into instance 
ssh -i /path/key-pair-name.pem instance-user-name@instance-public-dns-name
ssh -i ./eks-instance-ssh.pem ec2-user@ec2-34-204-98-119.compute-1.amazonaws.com


# add docker to instnace 
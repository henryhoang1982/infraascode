import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { Instance } from "@cdktf/provider-aws/lib/instance";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Init AWS provider with [default] profile
    new AwsProvider(this, "aws", {
      profile: "default"
    });

    // Create a new EC2 instance
    const ec2Instnace = new Instance(this, "ec2", { 
      ami: "ami-0d0175e9dbb94e0d2",
      instanceType: "t2.micro",
      tags: {
        Name: "cdktf-ec2-instance",
      },
    });

    // Create TerraformOutput with ec2Instnace public IP
    new TerraformOutput(this, "ec2_public_ip", {
      value: ec2Instnace.publicIp,
    });

  }
}



const app = new App();
new MyStack(app, "infraascode");
app.synth();

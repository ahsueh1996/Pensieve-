# coding: utf-8

"""
    Bacalhau API

    This page is the reference of the Bacalhau REST API. Project docs are available at https://docs.bacalhau.org/. Find more information about Bacalhau at https://github.com/bacalhau-project/bacalhau.  # noqa: E501

    OpenAPI spec version: ${PYPI_VERSION}
    Contact: team@bacalhau.org
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

import pprint
import re  # noqa: F401

import six


class ExecutionState(object):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    """
    Attributes:
      swagger_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    swagger_types = {
        "compute_reference": "str",
        "create_time": "str",
        "job_id": "str",
        "node_id": "str",
        "published_results": "StorageSpec",
        "run_output": "AllOfExecutionStateRunOutput",
        "state": "AllOfExecutionStateState",
        "status": "str",
        "update_time": "str",
        "verification_proposal": "list[int]",
        "verification_result": "VerificationResult",
        "version": "int",
    }

    attribute_map = {
        "compute_reference": "ComputeReference",
        "create_time": "CreateTime",
        "job_id": "JobID",
        "node_id": "NodeId",
        "published_results": "PublishedResults",
        "run_output": "RunOutput",
        "state": "State",
        "status": "Status",
        "update_time": "UpdateTime",
        "verification_proposal": "VerificationProposal",
        "verification_result": "VerificationResult",
        "version": "Version",
    }

    def __init__(
        self,
        compute_reference=None,
        create_time=None,
        job_id=None,
        node_id=None,
        published_results=None,
        run_output=None,
        state=None,
        status=None,
        update_time=None,
        verification_proposal=None,
        verification_result=None,
        version=None,
    ):  # noqa: E501
        """ExecutionState - a model defined in Swagger"""  # noqa: E501
        self._compute_reference = None
        self._create_time = None
        self._job_id = None
        self._node_id = None
        self._published_results = None
        self._run_output = None
        self._state = None
        self._status = None
        self._update_time = None
        self._verification_proposal = None
        self._verification_result = None
        self._version = None
        self.discriminator = None
        if compute_reference is not None:
            self.compute_reference = compute_reference
        if create_time is not None:
            self.create_time = create_time
        if job_id is not None:
            self.job_id = job_id
        if node_id is not None:
            self.node_id = node_id
        if published_results is not None:
            self.published_results = published_results
        if run_output is not None:
            self.run_output = run_output
        if state is not None:
            self.state = state
        if status is not None:
            self.status = status
        if update_time is not None:
            self.update_time = update_time
        if verification_proposal is not None:
            self.verification_proposal = verification_proposal
        if verification_result is not None:
            self.verification_result = verification_result
        if version is not None:
            self.version = version

    @property
    def compute_reference(self):
        """Gets the compute_reference of this ExecutionState.  # noqa: E501

        Compute node reference for this job execution  # noqa: E501

        :return: The compute_reference of this ExecutionState.  # noqa: E501
        :rtype: str
        """
        return self._compute_reference

    @compute_reference.setter
    def compute_reference(self, compute_reference):
        """Sets the compute_reference of this ExecutionState.

        Compute node reference for this job execution  # noqa: E501

        :param compute_reference: The compute_reference of this ExecutionState.  # noqa: E501
        :type: str
        """

        self._compute_reference = compute_reference

    @property
    def create_time(self):
        """Gets the create_time of this ExecutionState.  # noqa: E501

        CreateTime is the time when the job was created.  # noqa: E501

        :return: The create_time of this ExecutionState.  # noqa: E501
        :rtype: str
        """
        return self._create_time

    @create_time.setter
    def create_time(self, create_time):
        """Sets the create_time of this ExecutionState.

        CreateTime is the time when the job was created.  # noqa: E501

        :param create_time: The create_time of this ExecutionState.  # noqa: E501
        :type: str
        """

        self._create_time = create_time

    @property
    def job_id(self):
        """Gets the job_id of this ExecutionState.  # noqa: E501

        JobID the job id  # noqa: E501

        :return: The job_id of this ExecutionState.  # noqa: E501
        :rtype: str
        """
        return self._job_id

    @job_id.setter
    def job_id(self, job_id):
        """Sets the job_id of this ExecutionState.

        JobID the job id  # noqa: E501

        :param job_id: The job_id of this ExecutionState.  # noqa: E501
        :type: str
        """

        self._job_id = job_id

    @property
    def node_id(self):
        """Gets the node_id of this ExecutionState.  # noqa: E501

        which node is running this execution  # noqa: E501

        :return: The node_id of this ExecutionState.  # noqa: E501
        :rtype: str
        """
        return self._node_id

    @node_id.setter
    def node_id(self, node_id):
        """Sets the node_id of this ExecutionState.

        which node is running this execution  # noqa: E501

        :param node_id: The node_id of this ExecutionState.  # noqa: E501
        :type: str
        """

        self._node_id = node_id

    @property
    def published_results(self):
        """Gets the published_results of this ExecutionState.  # noqa: E501


        :return: The published_results of this ExecutionState.  # noqa: E501
        :rtype: StorageSpec
        """
        return self._published_results

    @published_results.setter
    def published_results(self, published_results):
        """Sets the published_results of this ExecutionState.


        :param published_results: The published_results of this ExecutionState.  # noqa: E501
        :type: StorageSpec
        """

        self._published_results = published_results

    @property
    def run_output(self):
        """Gets the run_output of this ExecutionState.  # noqa: E501

        RunOutput of the job  # noqa: E501

        :return: The run_output of this ExecutionState.  # noqa: E501
        :rtype: AllOfExecutionStateRunOutput
        """
        return self._run_output

    @run_output.setter
    def run_output(self, run_output):
        """Sets the run_output of this ExecutionState.

        RunOutput of the job  # noqa: E501

        :param run_output: The run_output of this ExecutionState.  # noqa: E501
        :type: AllOfExecutionStateRunOutput
        """

        self._run_output = run_output

    @property
    def state(self):
        """Gets the state of this ExecutionState.  # noqa: E501

        State is the current state of the execution  # noqa: E501

        :return: The state of this ExecutionState.  # noqa: E501
        :rtype: AllOfExecutionStateState
        """
        return self._state

    @state.setter
    def state(self, state):
        """Sets the state of this ExecutionState.

        State is the current state of the execution  # noqa: E501

        :param state: The state of this ExecutionState.  # noqa: E501
        :type: AllOfExecutionStateState
        """

        self._state = state

    @property
    def status(self):
        """Gets the status of this ExecutionState.  # noqa: E501

        an arbitrary status message  # noqa: E501

        :return: The status of this ExecutionState.  # noqa: E501
        :rtype: str
        """
        return self._status

    @status.setter
    def status(self, status):
        """Sets the status of this ExecutionState.

        an arbitrary status message  # noqa: E501

        :param status: The status of this ExecutionState.  # noqa: E501
        :type: str
        """

        self._status = status

    @property
    def update_time(self):
        """Gets the update_time of this ExecutionState.  # noqa: E501

        UpdateTime is the time when the job state was last updated.  # noqa: E501

        :return: The update_time of this ExecutionState.  # noqa: E501
        :rtype: str
        """
        return self._update_time

    @update_time.setter
    def update_time(self, update_time):
        """Sets the update_time of this ExecutionState.

        UpdateTime is the time when the job state was last updated.  # noqa: E501

        :param update_time: The update_time of this ExecutionState.  # noqa: E501
        :type: str
        """

        self._update_time = update_time

    @property
    def verification_proposal(self):
        """Gets the verification_proposal of this ExecutionState.  # noqa: E501

        the proposed results for this execution this will be resolved by the verifier somehow  # noqa: E501

        :return: The verification_proposal of this ExecutionState.  # noqa: E501
        :rtype: list[int]
        """
        return self._verification_proposal

    @verification_proposal.setter
    def verification_proposal(self, verification_proposal):
        """Sets the verification_proposal of this ExecutionState.

        the proposed results for this execution this will be resolved by the verifier somehow  # noqa: E501

        :param verification_proposal: The verification_proposal of this ExecutionState.  # noqa: E501
        :type: list[int]
        """

        self._verification_proposal = verification_proposal

    @property
    def verification_result(self):
        """Gets the verification_result of this ExecutionState.  # noqa: E501


        :return: The verification_result of this ExecutionState.  # noqa: E501
        :rtype: VerificationResult
        """
        return self._verification_result

    @verification_result.setter
    def verification_result(self, verification_result):
        """Sets the verification_result of this ExecutionState.


        :param verification_result: The verification_result of this ExecutionState.  # noqa: E501
        :type: VerificationResult
        """

        self._verification_result = verification_result

    @property
    def version(self):
        """Gets the version of this ExecutionState.  # noqa: E501

        Version is the version of the job state. It is incremented every time the job state is updated.  # noqa: E501

        :return: The version of this ExecutionState.  # noqa: E501
        :rtype: int
        """
        return self._version

    @version.setter
    def version(self, version):
        """Sets the version of this ExecutionState.

        Version is the version of the job state. It is incremented every time the job state is updated.  # noqa: E501

        :param version: The version of this ExecutionState.  # noqa: E501
        :type: int
        """

        self._version = version

    def to_dict(self):
        """Returns the model properties as a dict"""
        result = {}

        for attr, _ in six.iteritems(self.swagger_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(
                    map(lambda x: x.to_dict() if hasattr(x, "to_dict") else x, value)
                )
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(
                    map(
                        lambda item: (item[0], item[1].to_dict())
                        if hasattr(item[1], "to_dict")
                        else item,
                        value.items(),
                    )
                )
            else:
                result[attr] = value
        if issubclass(ExecutionState, dict):
            for key, value in self.items():
                result[key] = value

        return result

    def to_str(self):
        """Returns the string representation of the model"""
        return pprint.pformat(self.to_dict())

    def __repr__(self):
        """For `print` and `pprint`"""
        return self.to_str()

    def __eq__(self, other):
        """Returns true if both objects are equal"""
        if not isinstance(other, ExecutionState):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other
